// ============================================================================
// FUNCIONES DE FECHA Y TIEMPO
// ============================================================================

// Función para formatear fecha en español
export function formatDate(dateString) {
  if (!dateString) return '';
  // Parseamos la fecha como fecha local para evitar problemas de timezone
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long'
  });
}

// Función para formatear rango de fechas
export function formatDateRange(startDate, endDate) {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Presente';
  
  return `${start} - ${end}`;
}

// Función para calcular tiempo transcurrido
export function getTimeAgo(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  
  if (diffYears === 0) return 'Este año';
  if (diffYears === 1) return 'Hace 1 año';
  return `Hace ${diffYears} años`;
}

// Función para calcular duración entre fechas
export function calculateDuration(startDate, endDate) {
  if (!startDate) return '';
  const [startYear, startMonth, startDay] = startDate.split('-');
  const start = new Date(startYear, startMonth - 1, startDay);
  
  let end;
  if (endDate) {
    const [endYear, endMonth, endDay] = endDate.split('-');
    end = new Date(endYear, endMonth - 1, endDay);
  } else {
    end = new Date();
  }
  
  const diffTime = Math.abs(end - start);
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  
  if (years > 0) {
    return `${years} ${years === 1 ? 'año' : 'años'}${months > 0 ? ` ${months} meses` : ''}`;
  }
  return `${months} ${months === 1 ? 'mes' : 'meses'}`;
}

// ============================================================================
// FUNCIONES DE URL Y TEXTO
// ============================================================================

// Función para extraer dominio de URL
export function extractDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

// ============================================================================
// FUNCIONES DE ESTADO Y TIPO
// ============================================================================

// Función para determinar el estado del proyecto
export function getProjectStatus(endDate) {
  if (endDate) {
    return 'Completado';
  }
  return 'En Desarrollo';
}

// Función para determinar tipo de proyecto
export function getProjectType(name, description) {
  const webKeywords = ['web', 'website', 'frontend', 'react', 'vue'];
  const mobileKeywords = ['mobile', 'app', 'ios', 'android', 'react native'];
  const aiKeywords = ['ai', 'machine learning', 'neural', 'intelligence'];
  
  const text = `${name} ${description}`.toLowerCase();
  
  if (aiKeywords.some(keyword => text.includes(keyword))) return 'IA/ML';
  if (mobileKeywords.some(keyword => text.includes(keyword))) return 'Mobile';
  if (webKeywords.some(keyword => text.includes(keyword))) return 'Web';
  return 'Software';
}

// Función para determinar el tipo de award basado en los campos disponibles
export function getAwardType(award) {
  // Si tiene 'title' y 'awarder', es un Award
  if (award.title && award.awarder) return 'Award';
  
  // Si tiene 'name' e 'issuer', es un Certificate  
  if (award.name && award.issuer) return 'Certificate';
  
  // Fallback
  return award.title ? 'Award' : 'Certificate';
}

// ============================================================================
// FUNCIONES DE DETECCIÓN Y ANÁLISIS
// ============================================================================

// Función para detectar si es un premio/award
export function isAward(highlight) {
  const keywords = ['award', 'premio', 'won', 'ganó', 'winner', 'champion'];
  return keywords.some(keyword => 
    highlight.toLowerCase().includes(keyword.toLowerCase())
  );
}

// ============================================================================
// FUNCIONES DE COLORES Y ESTILOS
// ============================================================================

// Función para obtener color del badge según el tipo de award
export function getAwardBadgeColor(type) {
  switch(type) {
    case 'Certificate': return 'bg-amber-600';
    case 'Award': return 'bg-yellow-600';
    default: return 'bg-orange-600';
  }
}

// ============================================================================
// FUNCIONES DE SKILLS Y LANGUAGES
// ============================================================================

// Función para obtener nivel numérico del skill
export function getSkillLevel(level) {
  const levels = {
    'Beginner': 25,
    'Intermediate': 50,
    'Advanced': 75,
    'Expert': 90,
    'Master': 100
  };
  return levels[level] || 50;
}

// Función para obtener color según nivel de skill
export function getSkillColor(level) {
  const colors = {
    'Beginner': 'from-red-400 to-red-600',
    'Intermediate': 'from-orange-400 to-orange-600', 
    'Advanced': 'from-blue-400 to-blue-600',
    'Expert': 'from-indigo-500 to-indigo-700',
    'Master': 'from-purple-500 to-purple-700'
  };
  return colors[level] || 'from-blue-400 to-blue-600';
}

// Función para obtener nivel numérico del idioma
export function getLanguageLevel(fluency) {
  const levels = {
    'Elementary': 25,
    'Limited working': 40,
    'Professional working': 60,
    'Full professional': 80,
    'Native speaker': 100,
    'Native': 100
  };
  return levels[fluency] || 50;
}

// Función para obtener color según fluidez del idioma
export function getLanguageColor(fluency) {
  if (fluency.includes('Native')) return 'from-emerald-500 to-emerald-700';
  if (fluency.includes('Full professional')) return 'from-green-500 to-green-700';
  if (fluency.includes('Professional')) return 'from-blue-500 to-blue-700';
  if (fluency.includes('Limited')) return 'from-orange-500 to-orange-700';
  return 'from-slate-400 to-slate-600';
}