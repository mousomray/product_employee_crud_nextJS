import React from 'react';

const Index = () => {
  return (
    <div style={styles.container}>
      <img
        src="https://codebots.com/generated/_blog/crud/what-are-crud-operations/CRUD_Operations_Banner-800-5207ba831.webp"
        alt="CRUD Operations Banner"
        style={styles.image}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  image: {
    maxWidth: '80%',
    maxHeight: '60vh',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
  },
};

export default Index;
