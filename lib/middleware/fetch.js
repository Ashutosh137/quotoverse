export const fetchdata = async (url) => {
  try {
    const response = await fetch(`https://api.quotable.io/${url}`);
    if (!response.ok) throw new Error("HTTP error! status: " + response.status);
    else return await response.json();
  } catch (error) {
    console.log("Caught in fetchData: " + error);
  }
};
