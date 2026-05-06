export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          ativo: boolean
          atualizado_em: string
          criado_em: string
          email: string
          id: number
          nome: string
          password_hash: string
          password_salt: string
          ultimo_login_em: string | null
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          email: string
          id?: number
          nome: string
          password_hash: string
          password_salt: string
          ultimo_login_em?: string | null
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          email?: string
          id?: number
          nome?: string
          password_hash?: string
          password_salt?: string
          ultimo_login_em?: string | null
        }
        Relationships: []
      }
      categorias: {
        Row: {
          ativa: boolean
          criado_em: string | null
          descricao: string | null
          exibir_como_aba: boolean
          id: number
          layout_publico: string
          nome: string
          ordem: number
          slug: string | null
          tipo: string | null
        }
        Insert: {
          ativa?: boolean
          criado_em?: string | null
          descricao?: string | null
          exibir_como_aba?: boolean
          id?: number
          layout_publico?: string
          nome: string
          ordem?: number
          slug?: string | null
          tipo?: string | null
        }
        Update: {
          ativa?: boolean
          criado_em?: string | null
          descricao?: string | null
          exibir_como_aba?: boolean
          id?: number
          layout_publico?: string
          nome?: string
          ordem?: number
          slug?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      exposicoes: {
        Row: {
          data_fim: string | null
          data_inicio: string | null
          descricao: string | null
          id: number
          imagem_capa: string | null
          tipo: string | null
          titulo: string
        }
        Insert: {
          data_fim?: string | null
          data_inicio?: string | null
          descricao?: string | null
          id?: number
          imagem_capa?: string | null
          tipo?: string | null
          titulo: string
        }
        Update: {
          data_fim?: string | null
          data_inicio?: string | null
          descricao?: string | null
          id?: number
          imagem_capa?: string | null
          tipo?: string | null
          titulo?: string
        }
        Relationships: []
      }
      galeria_fotos: {
        Row: {
          album: string | null
          data_foto: string | null
          id: number
          ordem: number | null
          titulo: string | null
          url_foto: string
        }
        Insert: {
          album?: string | null
          data_foto?: string | null
          id?: number
          ordem?: number | null
          titulo?: string | null
          url_foto: string
        }
        Update: {
          album?: string | null
          data_foto?: string | null
          id?: number
          ordem?: number | null
          titulo?: string | null
          url_foto?: string
        }
        Relationships: []
      }
      midias: {
        Row: {
          categoria_id: number
          id: number
          legenda: string | null
          nome: string | null
          ordem: number | null
          tipo: string | null
          url: string
        }
        Insert: {
          categoria_id: number
          id?: number
          legenda?: string | null
          nome?: string | null
          ordem?: number | null
          tipo?: string | null
          url: string
        }
        Update: {
          categoria_id?: number
          id?: number
          legenda?: string | null
          nome?: string | null
          ordem?: number | null
          tipo?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "midias_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      publicacoes: {
        Row: {
          ano: number | null
          autor: string | null
          data_publicacao: string | null
          descricao: string | null
          id: number
          ordem: number
          rating: number
          tipo: string | null
          titulo: string
          topicos: string[]
          url_arquivo: string | null
          visualizacoes: number
        }
        Insert: {
          ano?: number | null
          autor?: string | null
          data_publicacao?: string | null
          descricao?: string | null
          id?: number
          ordem?: number
          rating?: number
          tipo?: string | null
          titulo: string
          topicos?: string[]
          url_arquivo?: string | null
          visualizacoes?: number
        }
        Update: {
          ano?: number | null
          autor?: string | null
          data_publicacao?: string | null
          descricao?: string | null
          id?: number
          ordem?: number
          rating?: number
          tipo?: string | null
          titulo?: string
          topicos?: string[]
          url_arquivo?: string | null
          visualizacoes?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never
