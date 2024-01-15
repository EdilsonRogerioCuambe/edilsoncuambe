export const pageView = (GOOGLE_MEASUREMENT_ID: string, url: string) => {
  window.gtag('config', GOOGLE_MEASUREMENT_ID, {
    page_path: url,
  })
}
