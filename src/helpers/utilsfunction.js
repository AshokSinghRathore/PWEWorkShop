export function getUrlForDirections(saddr, daddr) {

  const encodedSaddr = encodeURIComponent(saddr);
  const encodedDaddr = encodeURIComponent(daddr);


  let baseUrl = `https://www.google.com/maps?saddr=${encodedSaddr}&daddr=${encodedDaddr}`;
  
  return baseUrl;
}
