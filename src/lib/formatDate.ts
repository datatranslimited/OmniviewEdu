/**
 * Unified Date Formatter
 * 
 * Central utility to ensure all dates across the OmniviewEdu application 
 * are formatted in a completely unambiguous way, preventing confusion between 
 * US (MM/DD/YYYY) and EU (DD/MM/YYYY) formats.
 */

export function formatUnambiguousDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "N/A"
  
  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return "Invalid Date"
  
  // Format: "August 27, 2024" 
  // Spelling out the month makes it universally understood in any region.
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export function formatUnambiguousDateTime(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "N/A"
  
  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return "Invalid Date"
  
  // Format: "August 27, 2024, 02:30 PM"
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date)
}
