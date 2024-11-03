// services/fetchActors.js
import { fetchDataFromTMDB } from "@/util/fetchDataFromTMDB"

export const fetchPopularActors = async (page = 1) => {
  const data = await fetchDataFromTMDB(`/person/popular?page=${page}`)
  return data // Returns the full response including pagination info
}
