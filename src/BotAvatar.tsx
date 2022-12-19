import { Avatar } from "./Avatar";
import bot from "./bot.png";

interface IBotAvatarProps {
  isOnline?: boolean;
}

const BotAvatar: React.FC<IBotAvatarProps> = ({ isOnline = true }) => {
  return <Avatar src={bot} showBadge isOnline={isOnline} name="boredBot" />;
};

export default BotAvatar;
