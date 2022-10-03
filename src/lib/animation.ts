export const feedContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export const feedItem = {
  hidden: { opacity: 0, translateX: "-20%" },
  show: { opacity: 1, translateX: "0%" },
  exit: { opacity: 0, translateX: "-20%" },
}

export const subscriptionForm = { hidden: { height: "0px", opacity: 0 }, show: { height: "auto", opacity: 1 } }
