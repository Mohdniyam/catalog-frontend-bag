export default function PersonalInfo({ formData, isEditing, onChange }: any) {
  return (
    <>
      <h3 className="text-lg font-bold uppercase tracking-wide text-primary mb-4">
        Personal Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            First Name
          </p>

          {isEditing ? (
            <input
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              className="mt-1 w-full border text-black rounded-xs px-3 py-2"
            />
          ) : (
            <p className="font-medium">{formData.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Last Name
          </p>

          {isEditing ? (
            <input
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              className="mt-1 w-full border text-black rounded-xs px-3 py-2"
            />
          ) : (
            <p className="font-medium">{formData.lastName}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
            Gender
          </p>

          {isEditing ? (
            <div className="flex items-center gap-4 mt-1">
              <label className="flex items-center text-black gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={onChange}
                  className="accent-black"
                />
                <span>Male</span>
              </label>

              <label className="flex items-center text-black gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={onChange}
                  className="accent-black"
                />
                <span>Female</span>
              </label>
            </div>
          ) : (
            <p className="font-medium">{formData.gender}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Email */}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Email Address
          </p>

          {isEditing ? (
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              className="mt-1 w-full border text-black rounded-xs px-3 py-2"
            />
          ) : (
            <p className="font-medium">{formData.email}</p>
          )}
        </div>
        {/* Mobile */}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Mobile Number
          </p>

          {isEditing ? (
            <input
              name="mobile"
              value={formData.mobile}
              onChange={onChange}
              className="mt-1 w-full border text-black rounded-xs px-3 py-2"
            />
          ) : (
            <p className="font-medium">{formData.mobile}</p>
          )}
        </div>
      </div>
    </>
  );
}
