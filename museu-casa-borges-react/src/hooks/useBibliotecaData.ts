// AIDEV-NOTE: Hook para gerenciar dados da biblioteca com integração aos arquivos reais
// Este hook fornece acesso aos dados dos arquivos PDF das pastas INDEX

import { useState, useEffect, useMemo } from 'react';
import { 
  publicacoesData, 
  artigosData, 
  tccData, 
  pesquisasData,
  getDataByCategory,
  getFileById,
  getDownloadUrl,
  type PublicacaoData,
  type ArtigoData,
  type TCCData,
  type PesquisaData
} from '@/lib/file-utils';

export type BibliotecaCategory = 'publicacoes' | 'artigos' | 'tcc' | 'pesquisas';
export type BibliotecaData = PublicacaoData | ArtigoData | TCCData | PesquisaData;

interface UseBibliotecaDataProps {
  categoria?: BibliotecaCategory;
  searchTerm?: string;
  sortBy?: 'titulo' | 'autor' | 'ano' | 'visualizacoes' | 'rating';
  sortOrder?: 'asc' | 'desc';
  filterBy?: string;
}

export function useBibliotecaData({
  categoria,
  searchTerm = '',
  sortBy = 'ano',
  sortOrder = 'desc',
  filterBy
}: UseBibliotecaDataProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AIDEV-NOTE: Dados filtrados e ordenados
  const filteredData = useMemo(() => {
    let data: BibliotecaData[] = [];

    // Obter dados por categoria ou todos
    if (categoria) {
      data = getDataByCategory(categoria);
    } else {
      data = [
        ...publicacoesData,
        ...artigosData,
        ...tccData,
        ...pesquisasData
      ];
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
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
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      // Converter ano para número para ordenação correta
      if (sortBy === 'ano') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return data;
  }, [categoria, searchTerm, sortBy, sortOrder, filterBy]);

  // AIDEV-NOTE: Estatísticas dos dados
  const stats = useMemo(() => {
    return {
      total: filteredData.length,
      publicacoes: publicacoesData.length,
      artigos: artigosData.length,
      tcc: tccData.length,
      pesquisas: pesquisasData.length,
      totalVisualizacoes: filteredData.reduce((sum, item) => sum + (item.visualizacoes || 0), 0),
      mediaRating: filteredData.reduce((sum, item) => sum + (item.rating || 0), 0) / filteredData.length
    };
  }, [filteredData]);

  // AIDEV-NOTE: Categorias disponíveis
  const categorias = useMemo(() => {
    const allCategorias = new Set<string>();
    
    [...publicacoesData, ...artigosData, ...pesquisasData].forEach(item => {
      if ('categoria' in item && item.categoria) {
        allCategorias.add(item.categoria);
      }
    });

    return Array.from(allCategorias).sort();
  }, []);

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
    incrementViews
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