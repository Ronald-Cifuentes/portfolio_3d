import { techNamesMatchExactly } from './techMatching'

export const findCategoryForTech = (categories, techName) => {
  if (!techName) return null

  for (const category of categories) {
    const tech = category.techs.find(candidate => techNamesMatchExactly(candidate.name, techName))
    if (tech) return { category, tech }
  }

  return null
}

export const techsOfCategory = (categories, categoryId) =>
  categories.find(category => category.id === categoryId)?.techs ?? []
