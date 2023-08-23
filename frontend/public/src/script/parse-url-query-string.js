export const parseQueryStringForId = () => {
    const countyId = new URLSearchParams(window.location.search).get('id');
    console.log(countyId);
    return countyId;
}
