const Announcements = () => {
    return (
      <div className="bg-white p-4 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Announcements</h1>
          <span className="text-xs text-gray-400">View All</span>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-white rounded-md p-4 shadow-custom">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-red-500">Lorem ipsum dolor sit</h2>
              <span className="text-xs text-red-400 font-semibold bg-white rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className=" text-gray-600 text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
              expedita. Rerum, quidem facilis?
            </p>
          </div>
          <div className="bg-white shadow-custom rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-green-600">Lorem ipsum dolor sit</h2>
              <span className="text-xs text-green-600 font-semibold bg-white rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
              expedita. Rerum, quidem facilis?
            </p>
          </div>
          <div className="bg-white shadow-custom rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-orange-500">Lorem ipsum dolor sit</h2>
              <span className="text-xs text-orange-500 font-semibold bg-white rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
              expedita. Rerum, quidem facilis?
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Announcements;