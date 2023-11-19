import React from "react";

const UsersBrowseCard = () => {
  const users = [
    {
      name: "Alex Stanton",
      profileImage:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      role: "UI / UX Designer",
      bio: "Hi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web...",
      tasks: 40,
      reviews: "4.7 (750 Reviews)",
    },
    {
      name: "Antoine",
      profileImage:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      role: "Android Developer",
      bio: "Hi, I'm Alex Stanton. I am a doctoral student at Oxford University majoring in UI / UX...",
      tasks: 40,
      reviews: "4.7 (750 Reviews)",
    },
    {
      name: "Richard Kyle",
      profileImage:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      role: "2D Design",
      bio: "Hi, I'm Antoine Griezmann. I'm an Android Developer at Google company...",
      tasks: 40,
      reviews: "4.7 (750 Reviews)",
    },
  ];
  return (
    <div>
      <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
        {users.map((user, index) => (
          <div key={index} className="mb-6 rounded-lg bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="mr-2 h-10 w-10 rounded-full object-cover"
                  src={user.profileImage}
                  alt="profile"
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {user.name}
                  </h3>
                  <span className="block text-xs font-normal text-gray-500">
                    {user.role}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-green-500">
                <span className="mr-0.5">+</span>Follow
              </p>
            </div>
            <p className="my-6 text-sm font-normal text-gray-500">{user.bio}</p>
            <div className="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900">
              <div className="flex">
                {/* Task icon */}
                <span className="mr-1">{user.tasks} challenge</span>
              </div>
              <div className="flex items-center">
                {/* Review icon */}
                <span className="mr-1">{user.reviews}</span> Reviews
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersBrowseCard;
