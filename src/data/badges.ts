export interface Badge {
  id: string;
  label: string;
  badge: {
    title: string;
    emoji: string;
  };
}

export const badges: Badge[] = [
  {
    id: "late_responder",
    label: "Me demoro 3 años en una reply",
    badge: {
      title: "Late Responder Certificado",
      emoji: "⏳"
    }
  },
  {
    id: "loyal_partner",
    label: "Soy leal a mi partner",
    badge: {
      title: "Partner Leal",
      emoji: "💌"
    }
  },
  {
    id: "responsible_ghost",
    label: "Desaparezco pero siempre vuelvo",
    badge: {
      title: "Ghost Responsable",
      emoji: "👻"
    }
  },
  {
    id: "overthinker",
    label: "Sobrepienso cada respuesta",
    badge: {
      title: "Overthinker Profesional",
      emoji: "🧠"
    }
  },
  {
    id: "bible_writer",
    label: "Escribo demasiado",
    badge: {
      title: "Biblia Viviente",
      emoji: "📚"
    }
  },
  {
    id: "drama_responder",
    label: "Contesto rápido cuando hay drama",
    badge: {
      title: "Drama Responder",
      emoji: "🔥"
    }
  },
  {
    id: "headcanon_dealer",
    label: "Hago headcanons innecesarios",
    badge: {
      title: "Headcanon Dealer",
      emoji: "✍️"
    }
  },
  {
    id: "multiverse_creator",
    label: "Tengo demasiados OCs",
    badge: {
      title: "Multiverse Creator",
      emoji: "🧬"
    }
  },
  {
    id: "unfinished_arc",
    label: "Empiezo roles que nunca termino",
    badge: {
      title: "Arco Inconcluso",
      emoji: "🚧"
    }
  },
  {
    id: "emotional_damage",
    label: "Me apego emocionalmente a mis personajes",
    badge: {
      title: "Daño Emocional",
      emoji: "💔"
    }
  }
];
