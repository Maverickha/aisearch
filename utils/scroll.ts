export const scrollToSectionTop = (sectionId: string, offset: number = 100) => {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.warn(`Section with id ${sectionId} not found`);
    return;
  }

  const elementPosition = section.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: 'smooth'
  });
}; 