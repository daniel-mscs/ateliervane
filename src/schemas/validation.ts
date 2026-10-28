import { BioProfile, ProjectItem } from '../types/portfolio';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors: Record<string, string>;
}

/**
 * Camada de validação desacoplada.
 * Preparada para substituição direta por schemas do Zod (`z.object(...).safeParse`)
 * e integração com `zodResolver` do React Hook Form no futuro.
 */
export function validateBioForm(input: BioProfile): ValidationResult<BioProfile> {
  const errors: Record<string, string> = {};

  if (!input.brandName || input.brandName.trim().length < 2) {
    errors.brandName = 'O nome da marca/estúdio deve ter pelo menos 2 caracteres.';
  }
  if (!input.fullName || input.fullName.trim().length < 3) {
    errors.fullName = 'Informe o nome completo ou assinatura principal.';
  }
  if (!input.headline || input.headline.trim().length < 10) {
    errors.headline = 'O título principal (Headline) deve ter pelo menos 10 caracteres.';
  }
  if (!input.leadParagraph || input.leadParagraph.trim().length < 20) {
    errors.leadParagraph = 'O resumo introdutório deve ter pelo menos 20 caracteres.';
  }
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = 'Informe um endereço de e-mail institucional válido.';
  }

  return {
    success: Object.keys(errors).length === 0,
    data: Object.keys(errors).length === 0 ? input : undefined,
    errors,
  };
}

export function validateProjectForm(input: Omit<ProjectItem, 'id'>): ValidationResult<Omit<ProjectItem, 'id'>> {
  const errors: Record<string, string> = {};

  if (!input.title || input.title.trim().length < 3) {
    errors.title = 'O título do projeto deve conter ao menos 3 caracteres.';
  }
  if (!input.client || input.client.trim().length < 2) {
    errors.client = 'Informe o nome do cliente ou organização.';
  }
  if (!input.year || !/^\d{4}$/.test(input.year.trim())) {
    errors.year = 'Informe um ano válido com 4 dígitos (ex: 2026).';
  }
  if (!input.summary || input.summary.trim().length < 15) {
    errors.summary = 'A descrição executiva deve ter ao menos 15 caracteres.';
  }
  if (!input.technologies || input.technologies.length === 0) {
    errors.technologies = 'Adicione pelo menos uma tecnologia ou disciplina.';
  }

  return {
    success: Object.keys(errors).length === 0,
    data: Object.keys(errors).length === 0 ? input : undefined,
    errors,
  };
}
