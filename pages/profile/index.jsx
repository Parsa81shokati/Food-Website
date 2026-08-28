// pages/profile.js
import { useState, useEffect } from "react";
import useAuth from "@/features/auth/hooks/useAuth";
import { useMutation } from "@apollo/client/react";
import ProfileHeader from "@/features/userProfile/profile/components/ProfileHeader";
import ProfileForm from "@/features/userProfile/profile/components/ProfileForm";
import RequireAuth from "@/components/auth/RequireAuth";
import { UPDATE_PROFILE } from "@/features/userProfile/profile/mutation/UpdateUserProfile";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { user, updateUser } = useAuth();
  console.log(user);

  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) return;

    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
    });
  }, [user]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      });
    }
    setIsEditing(!isEditing);
    setSaveSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await updateProfile({
        variables: {
          id: user.id,
          firstName: editForm.firstName,
          lastName: editForm.lastName,
        },
      });

      updateUser({
        ...user,
        firstName: data.updatePeople.firstName,
        lastName: data.updatePeople.lastName,
      });

      setIsEditing(false);
      setSaveSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/80 py-8 px-4 pt-20">
        <div className="container mx-auto max-w-3xl">
          {/* Header Card */}
          <ProfileHeader user={user} />

          {/* Profile Card */}
          <ProfileForm
            isEditing={isEditing}
            editForm={editForm}
            handleInputChange={handleInputChange}
            handleEditToggle={handleEditToggle}
            loading={loading}
            user={user}
            saveSuccess={saveSuccess}
            handleSave={handleSave}
          />

          {/* Footer note */}
          <div className="text-center mt-8 text-xs text-gray-400">
            <span>Secure · Private · Your data is safe</span>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

export default ProfilePage;
