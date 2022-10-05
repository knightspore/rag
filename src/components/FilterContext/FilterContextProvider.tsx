import { useState, createContext, useContext} from "react"

export type FilterContextValue = {
  filters: {
    liked: boolean,
    unread: boolean,
    subscriptions: [] | string[],
  },
  setFilters: (value: FilterContextValue["filters"]) => void
}

const FilterContext = createContext<FilterContextValue>({} as FilterContextValue)

export function useFilterContext() {
  const value = useContext(FilterContext)
  if (value === null) {
    throw new Error("No FilterContext Value")
  } else {
    return value as FilterContextValue
  }
}

export default function FilterContextProvider({children}:{children: React.ReactNode}) {

  const [filters, setFilters] = useState<FilterContextValue["filters"]>({
    liked: false,
    unread: false,
    subscriptions: []
  })

  const value: FilterContextValue = {
    filters,
    setFilters,
  } 

  return <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
}
