return (
  <div className="min-h-screen bg-[#f6fef9] w-full">

    {/* Main responsive container */}
    <div className="w-full px-0 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-0 sm:py-4">

      {/* Profile Card */}
      <div className="w-full bg-white shadow-xl rounded-none sm:rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-10 pt-6 pb-4">

          <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-700">
            My Profile
          </h2>

        </div>

        {/* ================================================= */}
        {/* PROFILE TOP SECTION */}
        {/* ================================================= */}

        <div className="
          px-5 sm:px-6 md:px-8 lg:px-10
          pb-6
          flex flex-col
          lg:flex-row
          lg:items-center
          lg:gap-12
        ">

          {/* Profile Image + Basic Information */}
          <div className="
            flex flex-col
            items-center
            lg:flex-row
            lg:items-center
            lg:min-w-[380px]
            xl:min-w-[450px]
            gap-4
          ">

            {/* Profile Image */}
            <div
              className="
                w-30 h-30
                sm:w-32 sm:h-32
                p-[6px]
                bg-red-600
                shadow-md
                shrink-0
              "
              style={{
                clipPath:
                  "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
              }}
            >
              <img
                src={
                  formData.photoURL ||
                  "https://logodix.com/logo/1984123.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
                style={{
                  clipPath:
                    "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
                }}
              />
            </div>

            {/* Name / Email / Buttons */}
            {!editMode && (
              <div className="text-center lg:text-left">

                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {userData.name}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  {userData.email}
                </p>

                <div className="
                  flex
                  flex-wrap
                  justify-center
                  lg:justify-start
                  items-center
                  gap-2
                ">

                  <button
                    onClick={() => setEditMode(true)}
                    className="
                      bg-[#4CAF50]
                      text-white
                      text-xs sm:text-sm
                      px-3 py-2
                      border-b-2 border-l-2 border-black
                      rounded-tr-lg
                      hover:bg-[#3b873e]
                      cursor-pointer
                    "
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={() =>
                      setShowPasswordSection(!showPasswordSection)
                    }
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      text-xs sm:text-sm
                      px-3 py-2
                      border-b-2 border-l-2 border-black
                      rounded-tr-lg
                      cursor-pointer
                    "
                  >
                    Change Password
                  </button>

                </div>

              </div>
            )}
          </div>

          {/* ================================================= */}
          {/* EDIT PROFILE */}
          {/* ================================================= */}

          {editMode && (
            <div className="w-full mt-6 lg:mt-0">

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              ">

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="
                    border border-gray-300
                    p-3
                    rounded-lg
                    w-full
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />

                <input
                  type="text"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="
                    border border-gray-300
                    p-3
                    rounded-lg
                    w-full
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="
                    border border-gray-300
                    p-3
                    rounded-lg
                    w-full
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pin Code"
                  className="
                    border border-gray-300
                    p-3
                    rounded-lg
                    w-full
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Bio"
                  rows={3}
                  className="
                    border border-gray-300
                    p-3
                    rounded-lg
                    w-full
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                    md:col-span-2
                    resize-none
                  "
                />

              </div>

              <div className="flex flex-wrap gap-2 mt-4">

                <button
                  onClick={handleUpdate}
                  className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-5 py-2
                    rounded-lg
                    cursor-pointer
                    transition
                  "
                >
                  Save Changes
                </button>

                <button
                  onClick={() => {
                    setEditMode(false);
                    setFormData(userData);
                  }}
                  className="
                    bg-gray-200
                    hover:bg-gray-300
                    text-gray-700
                    px-5 py-2
                    rounded-lg
                    cursor-pointer
                  "
                >
                  Cancel
                </button>

              </div>

            </div>
          )}

        </div>


        {/* ================================================= */}
        {/* PASSWORD SECTION */}
        {/* ================================================= */}

        {!editMode && showPasswordSection && (
          <div className="
            mx-5 sm:mx-6 md:mx-8 lg:mx-10
            mb-6
            p-5
            bg-blue-50
            border border-blue-200
            rounded-2xl
          ">

            <h3 className="font-semibold text-blue-800 mb-4">
              Change Password
            </h3>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-3
            ">

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="
                  border border-gray-300
                  p-3
                  rounded-lg
                  w-full
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="
                  border border-gray-300
                  p-3
                  rounded-lg
                  w-full
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              <button
                onClick={handleChangePassword}
                className="
                  bg-blue-700
                  hover:bg-blue-800
                  text-white
                  px-4 py-3
                  rounded-lg
                  cursor-pointer
                  font-medium
                "
              >
                Update Password
              </button>

            </div>

          </div>
        )}


        {/* ================================================= */}
        {/* DIVIDER */}
        {/* ================================================= */}

        <div className="
          flex
          items-center
          gap-4
          mx-5 sm:mx-6 md:mx-8 lg:mx-10
          my-6
        ">

          <div className="
            flex-1
            h-px
            bg-gradient-to-r
            from-transparent
            via-red-600
            to-transparent
          " />

          <span className="
            text-sm
            text-red-600
            font-medium
            uppercase
            tracking-wide
          ">
            Information
          </span>

          <div className="
            flex-1
            h-px
            bg-gradient-to-r
            from-transparent
            via-red-600
            to-transparent
          " />

        </div>


        {/* ================================================= */}
        {/* INFORMATION SECTION */}
        {/* ================================================= */}

        <div className="
          mx-5 sm:mx-6 md:mx-8 lg:mx-10
          mb-6
          bg-gradient-to-r
          from-gray-50
          to-gray-100
          rounded-2xl
          p-4 sm:p-5
          border border-gray-200
        ">

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-4
          ">

            {/* Address */}
            <div className="
              bg-white
              rounded-xl
              border border-gray-200
              shadow-sm
              p-4
              min-h-[110px]
            ">

              <p className="
                text-xs
                text-gray-500
                uppercase
                tracking-wide
              ">
                Address <span className="text-lg">📍</span>
              </p>

              <p className="
                text-sm
                font-medium
                text-gray-800
                mt-2
                leading-relaxed
              ">
                {userData.address || "Not provided"}
              </p>

            </div>


            {/* Pin Code */}
            <div className="
              bg-white
              rounded-xl
              border border-gray-200
              shadow-sm
              p-4
              min-h-[110px]
            ">

              <p className="
                text-xs
                text-gray-500
                uppercase
                tracking-wide
              ">
                Pin Code <span className="text-lg">🏷️</span>
              </p>

              <p className="
                text-sm
                font-semibold
                text-blue-600
                mt-2
                tracking-wide
              ">
                {userData.pincode || "Not provided"}
              </p>

            </div>


            {/* Bio */}
            <div className="
              bg-white
              rounded-xl
              border border-gray-200
              shadow-sm
              p-4
              min-h-[110px]
              md:col-span-2
              lg:col-span-1
            ">

              <p className="
                text-xs
                text-gray-500
                uppercase
                tracking-wide
              ">
                Bio <span className="text-lg">📝</span>
              </p>

              <p className="
                text-sm
                text-gray-700
                mt-2
                leading-relaxed
              ">
                {userData.bio ||
                  "Here, you can write about yourself."}
              </p>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* BOTTOM BUTTONS */}
        {/* ================================================= */}

        <div className="
          px-5 sm:px-6 md:px-8 lg:px-10
          pb-4
          flex
          flex-wrap
          justify-center
          gap-2
        ">

          <button
            onClick={handleSignOut}
            className="
              text-white
              bg-rose-700
              px-4 py-2
              rounded-lg
              hover:bg-white
              hover:text-rose-700
              border-2 border-rose-700
              cursor-pointer
              transition-all
              duration-200
            "
          >
            Log Out
          </button>

          <button
            onClick={() => navigate("/join")}
            className="
              text-rose-700
              bg-white
              border-2 border-rose-700
              px-4 py-2
              rounded-lg
              hover:bg-red-700
              hover:text-white
              transition-all
              duration-200
              cursor-pointer
            "
          >
            Become a Worker
          </button>

        </div>


        {/* Version */}
        <p className="
          text-xs
          text-gray-400
          text-center
          pb-5
          mt-2
        ">
          App version 1.0.1
        </p>

      </div>
    </div>
  </div>
);
