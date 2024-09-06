import { useState, useEffect } from "react";
import { API_BASE_URL } from "../globalVariables";

const useFetchCourseDetails = (id) => {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`);
        if (!response.ok) {
          throw new Error("Course not found");
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return { course, error, loading };
};

export default useFetchCourseDetails;
