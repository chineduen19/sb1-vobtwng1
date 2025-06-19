import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex space-x-1">
      <div className="w-4 h-10 rounded-full bg-navy-400" />
      <div className="w-4 h-10 rounded-full bg-green-500" />
      <div className="w-4 h-10 rounded-full bg-gold-400" />
    </div>
  );
};

export default Logo;