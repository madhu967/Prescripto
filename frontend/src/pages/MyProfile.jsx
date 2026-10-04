import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="py-8 sm:py-12 max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 text-gray-700">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-5">
              {isEdit ? (
                <label htmlFor="image" className="relative cursor-pointer group">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-teal-50 bg-teal-50">
                    <img
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      src={image ? URL.createObjectURL(image) : userData.image || assets.profile_pic}
                      alt="Profile"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center text-white text-xs font-semibold">
                    Change
                  </div>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                  />
                </label>
              ) : (
                <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-teal-50 bg-teal-50 shadow-sm flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={userData.image || assets.profile_pic}
                    alt={userData.name}
                  />
                </div>
              )}

              <div>
                {isEdit ? (
                  <input
                    className="w-full text-2xl font-bold font-serif px-3 py-1.5 rounded-xl border border-gray-300 focus:border-[#0D9488] outline-none"
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
                    {userData.name}
                  </h1>
                )}
                <p className="text-xs text-gray-400 mt-1">Verified Patient Profile</p>
              </div>
            </div>

            <button
              onClick={() => (isEdit ? updateUserProfileData() : setIsEdit(true))}
              className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all ${
                isEdit
                  ? "bg-[#0D9488] text-white shadow-md hover:bg-[#0f766e]"
                  : "border border-gray-200 text-gray-700 hover:border-[#0D9488] hover:text-[#0D9488]"
              }`}
            >
              {isEdit ? "Save Profile" : "Edit Details"}
            </button>
          </div>

          {/* Contact Details */}
          <div className="mt-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
              <span className="font-semibold text-gray-500">Email Address:</span>
              <span className="sm:col-span-2 text-gray-900 font-medium">{userData.email}</span>

              <span className="font-semibold text-gray-500">Phone Number:</span>
              <div className="sm:col-span-2">
                {isEdit ? (
                  <input
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#0D9488] outline-none"
                    type="text"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                ) : (
                  <span className="text-gray-900">{userData.phone || "Not specified"}</span>
                )}
              </div>

              <span className="font-semibold text-gray-500">Residential Address:</span>
              <div className="sm:col-span-2">
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#0D9488] outline-none"
                      type="text"
                      placeholder="Street line 1"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={userData.address?.line1 || ""}
                    />
                    <input
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#0D9488] outline-none"
                      type="text"
                      placeholder="City / Postal line 2"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={userData.address?.line2 || ""}
                    />
                  </div>
                ) : (
                  <span className="text-gray-900">
                    {userData.address?.line1 || "No street address"}, {userData.address?.line2 || ""}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-4">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
              <span className="font-semibold text-gray-500">Gender:</span>
              <div className="sm:col-span-2">
                {isEdit ? (
                  <select
                    className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#0D9488] outline-none bg-white"
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, gender: e.target.value }))
                    }
                    value={userData.gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <span className="text-gray-900">{userData.gender || "Not set"}</span>
                )}
              </div>

              <span className="font-semibold text-gray-500">Date of Birth:</span>
              <div className="sm:col-span-2">
                {isEdit ? (
                  <input
                    className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#0D9488] outline-none"
                    type="date"
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, dob: e.target.value }))
                    }
                    value={userData.dob || ""}
                  />
                ) : (
                  <span className="text-gray-900">{userData.dob || "Not set"}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
