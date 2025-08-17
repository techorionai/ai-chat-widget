/**
 * Converts a timestamp string in ISO format to a human-readable string
 *
 * @param timestamp - A timestamp string in ISO format.
 * @returns A human-readable string representing the time elapsed since the given timestamp.
 */
function getPrettyDate(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = now.getTime() - date.getTime();

  // Convert to appropriate units
  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.436875); // Average days in a month
  const years = Math.floor(months / 12);

  // Return the formatted string
  if (seconds < 1) {
    return "Just now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

export default getPrettyDate;
