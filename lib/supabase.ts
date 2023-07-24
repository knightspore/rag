export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          content: string | null
          created_at: string | null
          description: string | null
          embedding: string | null
          id: string
          is_read: boolean | null
          pub_date: string
          subscription: string
          title: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          id?: string
          is_read?: boolean | null
          pub_date: string
          subscription?: string
          title: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          id?: string
          is_read?: boolean | null
          pub_date?: string
          subscription?: string
          title?: string
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      likes: {
        Row: {
          article_title: string | null
          id: number
          subscription_title: string | null
          user_id: string
        }
        Insert: {
          article_title?: string | null
          id?: number
          subscription_title?: string | null
          user_id: string
        }
        Update: {
          article_title?: string | null
          id?: number
          subscription_title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          email: string | null
          id: string
        }
        Insert: {
          email?: string | null
          id: string
        }
        Update: {
          email?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          muted: boolean
          title: string
          updated_at: string | null
          url: string
          user: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          muted?: boolean
          title: string
          updated_at?: string | null
          url: string
          user: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          muted?: boolean
          title?: string
          updated_at?: string | null
          url?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      feeds: {
        Row: {
          content: string | null
          created_at: string | null
          description: string | null
          email: string | null
          is_read: boolean | null
          like: number | null
          pub_date: string | null
          subscription: string | null
          subscription_url: string | null
          title: string | null
          url: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subscription_feed: {
        Row: {
          id: string | null
          pub_date: string | null
          subscription: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      user_feed: {
        Args: {
          user_id: string
          article_count: number
          article_offset: number
        }
        Returns: {
          id: string
          title: string
          description: string
          url: string
          content: string
          pub_date: string
          subscription: string
          subscription_description: string
          subscription_url: string
          subscription_icon: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
