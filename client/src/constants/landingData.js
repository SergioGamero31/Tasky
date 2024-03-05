const questions = [
  {
    id: 0,
    question:
      '¿Cuáles son los beneficios de utilizar Tasky en comparación con otras herramientas de gestión de tareas?',
    answer:
      'Tasky destaca por su simplicidad, gratuidad y enfoque en la productividad. A diferencia de otras herramientas, no te costará nada acceder a todas las funciones esenciales para mejorar tu organización y eficiencia diaria.'
  },
  {
    id: 1,
    question: '¿Cómo puedo compartir tareas y colaborar con mi equipo en Tasky?',
    answer:
      'Colaborar es sencillo en Tasky. Puedes invitar a miembros de tu equipo a proyectos específicos y compartir actualizaciones instantáneas. La colaboración se vuelve más fluida con comentarios integrados en cada tarea.'
  },
  {
    id: 2,
    question: '¿Tasky funciona en todos los dispositivos?',
    answer:
      '¡Sí! Tasky es compatible con dispositivos móviles, tabletas y computadoras. Puedes acceder a tus tareas y proyectos desde cualquier lugar, manteniendo la sincronización en todos tus dispositivos de forma gratuita.'
  },
  {
    id: 3,
    question: '¿Tasky es seguro para almacenar información sensible?',
    answer:
      '¡Absolutamente! La seguridad de tus datos es una prioridad para nosotros. Utilizamos medidas de seguridad avanzadas para proteger tu información y garantizar tu privacidad mientras utilizas Tasky.'
  }
]

//prettier-ignore
const roles = [
  { id: 0, role: 'Front-End Dev', color: 'violet', img: '/assets/frontend.webp', position: { top: '15%', left: '20%' }},
  { id: 1, role: 'Back-End Dev', color: 'orange', img: '/assets/backend.webp', position: { top: '15%', right: '20%' }},
  { id: 2, role: 'UI/UX Designer', color: 'green', img: '/assets/ux.webp', position: { top: '45%', left: '10%' }},
  { id: 3, role: 'Project Manager', color: 'orange', img: '/assets/frontend.webp', position: { bottom: '15%', left: '20%' }},
  { id: 4, role: 'Product Designer', color: 'violet', img: '/assets/product.webp', position: { top: '45%', right: '10%' }},
  { id: 5, role: 'QA Enginner', color: 'green', img: '/assets/qa.webp', position: { bottom: '15%', right: '20%' }}
]

export { roles, questions }
