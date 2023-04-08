import React from 'react';


function AdminPage() {
  
  const user = useSelector(store => store.user);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  if (user.admin)
  return (
    <div className="container">
      <div>
        <p>ADMIN PAGE</p>
      </div>
    </div>
  );
}

export default AdminPage;