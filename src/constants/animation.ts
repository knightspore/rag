export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

export const item = {
  hidden: { opacity: 0, translateX: "-20%" },
  show: { opacity: 1, translateX: "0%" },
}
