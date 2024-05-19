import React from 'react';

const Profile = ({ givenName, familyName, email, picture }) => {
  const styles = {
    boxArea: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    singleBox: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
      borderRadius: '4px',
      backgroundColor: '#fff',
      textAlign: 'center',
    //   margin: '20px',
    //   padding: '35px',
      transition: '.3s',
    },
    imgArea: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '150px',
      height: '150px',
      border: '6px solid #ddd',
      borderRadius: '50%',
      marginBottom: '10px',
      overflow: 'hidden',
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    headerText: {
      fontSize: '24px',
      fontWeight: '500',
      lineHeight: '48px',
    },
    imgText: {
      textAlign: 'center',
    },
    imgTextH3: {
      margin: '10px 0',
    },
    imgTextP: {
      fontSize: '15px',
      fontWeight: '400',
      lineHeight: '30px',
    }
  };

  return (
    <div style={styles.boxArea}>
       
      <div style={styles.singleBox}>
      <h1 style={{color:"#5F5F5F"}}>Profile</h1>
        <div style={styles.imgArea}>
          <img src={picture} alt="Profile" style={styles.img} />
        </div>
        <div style={styles.imgText}>
          <span style={styles.headerText}>
            <strong>{givenName} {familyName}</strong>
          </span>
          <p style={styles.imgTextH3}>First Name: {givenName}</p>
          <p style={styles.imgTextH3}>Last Name: {familyName}</p>
          <p style={styles.imgTextH3}>Email: {email}</p>
          
          <b style={styles.imgTextp}>
          Better vision for better connection.
          </b>
        </div>
      </div>
    </div>
  );
};

export default Profile;
