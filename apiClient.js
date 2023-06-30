const deletePaper = async (paperId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/papers/${paperId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        console.log('Paper deleted successfully');
      } else {
        console.log('Failed to delete paper:', data.message);
      }
    } catch (error) {
      console.error('Error deleting paper:', error);
    }
  };
  
  // Example usage: Call the deletePaper function with the paper ID
  const paperId = '123'; // Replace with the actual paper ID
  deletePaper(paperId);
  