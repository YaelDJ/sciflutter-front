export const getErrorMessage = (error: string): { code: number, message: string } => {
  switch (error) {
    case 'fetch failed': return { code: 503, message: 'The server connection is not available, try again later' }
    default: return { code: 500, message: error }
  }
}