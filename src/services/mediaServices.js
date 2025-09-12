  // returns api endpoint for fetching trending media based on the type = {today or this_week}
  export function getTrendingEndpoint(type) {
    return `/trending/movie/${type}`
  }

  // returns api endpoint for fetching popular media, based on the category include: streaming, on_tv, for_rent ..etc
  export function getPopularEndpoint(category) {
    switch (category) {
      case "streaming":
        return "/movie/popular?with_watch_monetization_types=flatrate"
      case "on_tv":
        return "/tv/popular"
      case "for_rent":
        return "/movie/popular?with_watch_monetization_types=rental"
      case "in_theaters":
        return "/movie/now_playing"
      default:
        return "/movie/popular"
    }
  }

  // returns api endpoint for fetching media that is free to watch, based on the category.{movie, tv}
  export function getFreeToWatchEndpoint(category) {
    return `/discover/${category}?with_watch_monetization_types=free`
  }

  // returns a link to the item's page, based on whether it's a movie or a TV show.
  export function getMediaLink(item) {
    return item.name ? `/tv/${item.id}` : `/movie/${item.id}`
  }

  // returns the title of the media item.
  export function getMediaTitle(item) {
    return item.title || item.name
  }

  // release date of media {movie or tv}
  export function getMediaReleaseDate(item) {
    return item.release_date || item.first_air_date
  }
