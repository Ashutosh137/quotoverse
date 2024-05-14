const Time = (seconds) => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const differenceInSeconds = currentTimeInSeconds - seconds;
  if (seconds) {
    if (differenceInSeconds < 10) {
      return "Just now";
    } else if (differenceInSeconds < 60) {
      return `${differenceInSeconds} sec ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} min${minutes > 1 ? "s ago" : "Just now"}`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hr${hours > 1 ? "s" : "ago"}`;
    } else {
      const dateObject = new Date(seconds * 1000);

      return dateObject.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
      });
    }
  } else {
    console.log("error");
    return "just now";
  }
};

function convertDateStringIntoSeconds(dateString) {
  const date = new Date(dateString);
  const milliseconds = date.getTime();
  const seconds = milliseconds / 1000;
  return Time(seconds.toFixed());
}
export default convertDateStringIntoSeconds;
