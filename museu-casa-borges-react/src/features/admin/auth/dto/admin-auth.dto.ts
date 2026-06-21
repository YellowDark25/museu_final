export interface AdminLoginInputDTO {
  email: string
  password: string
}

export interface AdminLoginFieldErrorsDTO {
  email?: string
  password?: string
}

export interface AdminSessionDTO {
  userId: string
  name: string
  email: string
  role: "admin"
  expiresAt: string
}

export interface AdminAuthSuccessDTO {
  ok: true
  message: string
  redirectTo: string
}

export interface AdminAuthErrorDTO {
  ok: false
  message: string
  fieldErrors: AdminLoginFieldErrorsDTO
}

export type AdminAuthResponseDTO = AdminAuthSuccessDTO | AdminAuthErrorDTO
