import React from "react";
import { View } from "react-native";
import { IconButton, SubText } from "@/components";
import { useVotePost } from "../../api";
import { useAuthStore, useToastStore } from "@/stores";

interface Props {
  numComments: number;
  numLikes: number;
  likes: boolean | null;
  postId: string;
  postName: string;
}

export const CardFooter = ({
  numComments,
  numLikes,
  likes,
  postId,
  postName,
}: Props) => {
  const voteMutation = useVotePost({ postId: postId });
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToast = useToastStore((state) => state.addToast);

  const handleUpVote = () => {
    voteMutation.mutate({ id: postName, dist: 1 });
  };

  const handleDownVote = () => {
    voteMutation.mutate({ id: postName, dist: -1 });
  };

  const handleRemoveVote = () => {
    voteMutation.mutate({ id: postName, dist: 0 });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 12,
        flexWrap: "nowrap",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 0.4,
        }}
      >
        {likes === true ? (
          <IconButton
            icon="arrow-up-thick"
            color="orange"
            onPress={handleRemoveVote}
          />
        ) : (
          <IconButton icon="arrow-up-thick" onPress={handleUpVote} />
        )}
        <SubText>{numLikes}</SubText>
        {likes === false ? (
          <IconButton
            icon="arrow-down-thick"
            color="purple"
            onPress={handleRemoveVote}
          />
        ) : (
          <IconButton icon="arrow-down-thick" onPress={handleDownVote} />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          flex: 0.3,
        }}
      >
        <IconButton icon="comment-outline" />
        <SubText>{numComments}</SubText>
      </View>
      <IconButton icon="bookmark-outline" />
      <IconButton icon="share-variant" />
    </View>
  );
};
