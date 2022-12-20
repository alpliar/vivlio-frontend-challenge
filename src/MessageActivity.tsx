import { Box, Link, Tag, TagProps, Text, Wrap } from "@chakra-ui/react";
import { IActivity } from "./models/activity.model";
import ActivityHelper from "./services/activities.service";

type IMessageActivityProps = {
  activity: IActivity;
};

const tagStyle: TagProps = {
  colorScheme: "bubble.bot",
  variant: "solid",
  size: "md",
};

const MessageActivity: React.FC<IMessageActivityProps> = ({
  activity: { activity, accessibility, price, link, participants, type },
}) => {
  const accessibilityLabel =
    ActivityHelper.getAccessibilityLabel(accessibility);
  const priceLabel = ActivityHelper.getPriceLabel(price);
  const categoryInfos = ActivityHelper.getCategoryInfos(type);
  return (
    <>
      <Text>
        <>
          Have you tried to{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {!!link ? (
              <Link
                style={{
                  textDecoration: "underline",
                }}
                href={link}
                isExternal
              >
                {activity.toLocaleLowerCase()}
              </Link>
            ) : (
              activity.toLocaleLowerCase()
            )}{" "}
            ?
          </span>
        </>
      </Text>
      <Box>
        <Wrap justify="end" maxW="lg" ml="auto">
          <Tag {...tagStyle}>{accessibilityLabel}</Tag>
          <Tag {...tagStyle}>{priceLabel}</Tag>
          {participants && (
            <Tag {...tagStyle}>
              <span>
                {new Array(participants + 1).join("🧑")} {participants}+
              </span>
            </Tag>
          )}
          <Tag {...tagStyle}>
            {categoryInfos.icon} {categoryInfos.name}
          </Tag>
        </Wrap>
      </Box>
    </>
  );
};

export default MessageActivity;
