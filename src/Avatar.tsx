import {
  Avatar as ChakraAvatar,
  AvatarBadge,
  AvatarBadgeProps,
  AvatarProps,
} from "@chakra-ui/react";

interface IAvatarProps {
  src: AvatarProps["src"];
  showBadge?: boolean;
  isOnline?: boolean;
  name: string;
}

export const Avatar: React.FC<IAvatarProps> = ({
  src,
  showBadge = false,
  isOnline = true,
  name,
}) => {
  const badgeColor: AvatarBadgeProps["bg"] = isOnline ? "green.500" : "red.500";
  return (
    <ChakraAvatar boxSize={10} src={src} name={name}>
      {showBadge && <AvatarBadge boxSize="0.75em" bg={badgeColor} />}
    </ChakraAvatar>
  );
};
