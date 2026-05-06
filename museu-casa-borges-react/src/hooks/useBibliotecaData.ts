// AIDEV-NOTE: Biblioteca pública — lista apenas documentos da API (PostgreSQL).
// Recarrega ao voltar para a aba do navegador para refletir alterações feitas no admin.

import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  getDownloadUrl,
  type PublicacaoData,
  type ArtigoData,
  type TCCData,
  type PesquisaData
} from '@/lib/file-utils';
import { mapDocumentoPublicDtoToItem } from '@/lib/biblioteca-map-public';
import type { AdminBibliotecaDocumentoDTO } from '@/features/admin/biblioteca/dto/admin-biblioteca.dto';

export type BibliotecaCategory = 'publicacoes' | 'artigos' | 'tcc' | 'pesquisas';
export type BibliotecaData = PublicacaoData | ArtigoData | TCCData | PesquisaData;

interface UseBibliotecaDataProps {
  categoria?: BibliotecaCategory;
  searchTerm?: string;
  sortBy?: 'titulo' | 'autor' | 'ano' | 'visualizacoes' | 'rating' | 'ordem';
  sortOrder?: 'asc' | 'desc';
  filterBy?: string;
}

export function useBibliotecaData({
  categoria,
  searchTerm: searchTermProp,
  sortBy = 'ordem',
  sortOrder = 'asc',
  filterBy,
}: UseBibliotecaDataProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dbItems, setDbItems] = useState<PublicacaoData[]>([]);
  const [searchUi, setSearchUi] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    BibliotecaCategory | 'todos'
  >('todos');

  const effectiveSearchTerm =
    searchTermProp !== undefined && String(searchTermProp).trim().length > 0
      ? String(searchTermProp).trim()
      : searchUi;

  useEffect(() => {
    let cancelled = false;

    async function loadFromApi() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/biblioteca/documentos', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Falha ao carregar documentos');
        }
        const body = (await res.json()) as { documentos: AdminBibliotecaDocumentoDTO[] };
        if (!cancelled) {
          setDbItems(
            (body.documentos ?? []).map((d) => mapDocumentoPublicDtoToItem(d))
          );
        }
      } catch {
        if (!cancelled) {
          setDbItems([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadFromApi();

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        loadFromApi();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // AIDEV-NOTE: Somente documentos persistidos no banco (API pública).
  const filteredData = useMemo(() => {
    let data: BibliotecaData[] = categoria
      ? dbItems.filter((item) => item.bibliotecaTab === categoria)
      : [...dbItems];

    // Filtrar por termo de busca
    if (effectiveSearchTerm) {
      const term = effectiveSearchTerm.toLowerCase();
      data = data.filter(item => 
        item.titulo.toLowerCase().includes(term) ||
        item.autor.toLowerCase().includes(term) ||
        item.tags?.some(tag => tag.toLowerCase().includes(term)) ||
        item.descricao?.toLowerCase().includes(term)
      );
    }

    // Filtrar por categoria específica (quando não há categoria selecionada)
    if (filterBy && !categoria) {
      data = data.filter(item => 
        'categoria' in item && item.categoria === filterBy
      );
    }

    // Ordenar dados
    data.sort((a, b) => {
      if (sortBy === 'ordem') {
        const ao =
          'ordem' in a && typeof (a as PublicacaoData).ordem === 'number'
            ? (a as PublicacaoData).ordem!
            : 0;
        const bo =
          'ordem' in b && typeof (b as PublicacaoData).ordem === 'number'
            ? (b as PublicacaoData).ordem!
            : 0;
        const cmp = ao - bo;
        return sortOrder === 'asc' ? cmp : -cmp;
      }

      let aValue: number | string =
        (a as BibliotecaData)[sortBy as keyof BibliotecaData] as number | string;
      let bValue: number | string =
        (b as BibliotecaData)[sortBy as keyof BibliotecaData] as number | string;

      if (sortBy === 'ano') {
        aValue = parseInt(String(aValue ?? ''), 10) || 0;
        bValue = parseInt(String(bValue ?? ''), 10) || 0;
      } else if (sortBy === 'titulo' || sortBy === 'autor') {
        aValue = String(aValue ?? '').toLowerCase();
        bValue = String(bValue ?? '').toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    });

    return data;
  }, [categoria, effectiveSearchTerm, sortBy, sortOrder, filterBy, dbItems]);

  // AIDEV-NOTE: Estatísticas dos dados
  const stats = useMemo(() => {
    const len = (tab: 'publicacoes' | 'pesquisas' | 'artigos' | 'tcc') =>
      dbItems.filter((i) => i.bibliotecaTab === tab).length;

    return {
      total: filteredData.length,
      publicacoes: len('publicacoes'),
      artigos: len('artigos'),
      tcc: len('tcc'),
      pesquisas: len('pesquisas'),
      totalVisualizacoes: filteredData.reduce((sum, item) => sum + (item.visualizacoes || 0), 0),
      mediaRating: filteredData.length
        ? filteredData.reduce((sum, item) => sum + (item.rating || 0), 0) / filteredData.length
        : 0
    };
  }, [filteredData, dbItems]);

  // AIDEV-NOTE: Categorias disponíveis
  const categorias = useMemo(() => {
    const allCategorias = new Set<string>();
    dbItems.forEach((item) => {
      if (item.categoria) {
        allCategorias.add(item.categoria);
      }
    });
    return Array.from(allCategorias).sort();
  }, [dbItems]);

  // AIDEV-NOTE: Tags disponíveis
  const tags = useMemo(() => {
    const allTags = new Set<string>();
    
    filteredData.forEach(item => {
      item.tags?.forEach(tag => allTags.add(tag));
    });

    return Array.from(allTags).sort();
  }, [filteredData]);

  // AIDEV-NOTE: Função para obter item por ID
  const getItemById = (id: string) => {
    return filteredData.find(item => item.id === id);
  };

  // AIDEV-NOTE: Função para obter URL de download
  const getItemDownloadUrl = (item: BibliotecaData) => {
    return getDownloadUrl(item.arquivo);
  };

  // AIDEV-NOTE: Função para verificar se arquivo existe
  const checkFileExists = async (arquivo: string): Promise<boolean> => {
    try {
      const response = await fetch(getDownloadUrl(arquivo), { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  // AIDEV-NOTE: Função para incrementar visualizações (simulada)
  const incrementViews = (id: string) => {
    // Em uma implementação real, isso seria uma chamada para API
    console.log(`Incrementando visualizações para item ${id}`);
  };

  const setSearchTerm = useCallback((term: string) => {
    setSearchUi(term);
  }, []);

  return {
    data: filteredData,
    stats,
    categorias,
    tags,
    isLoading,
    error,
    getItemById,
    getItemDownloadUrl,
    checkFileExists,
    incrementViews,
    searchTerm: effectiveSearchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };
}

// AIDEV-NOTE: Hook específico para uma categoria
export function useBibliotecaCategory(categoria: BibliotecaCategory) {
  return useBibliotecaData({ categoria });
}

// AIDEV-NOTE: Hook para busca
export function useBibliotecaSearch(searchTerm: string) {
  return useBibliotecaData({ searchTerm });
}