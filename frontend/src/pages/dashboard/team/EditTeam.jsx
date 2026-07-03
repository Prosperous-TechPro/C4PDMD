import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getTeamMemberById, updateTeamMember } from "../../../api/team/teamApi";
import TeamForm from "../../../components/forms/TeamForm";
import PageLoader from "../../../components/loaders/PageLoader";

export default function EditTeam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["team-member", id],
    queryFn: () => getTeamMemberById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (values) => updateTeamMember(id, values),
    onSuccess: () => {
      toast.success("Team member updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["team"] });
      navigate("/dashboard/team");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update team member."
      );
    },
  });

  if (isLoading) return <PageLoader />;

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600">
        Failed to load team member.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Edit Team Member</h1>

      <TeamForm
        initialData={data}
        onSubmit={(values) => mutation.mutate(values)}
        loading={mutation.isPending}
        submitText="Update Team Member"
      />
    </div>
  );
}