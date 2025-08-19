import { Tooltip, Avatar } from "@mantine/core";
import { ChatWidgetHeaderAvatarConfig } from "../../types/mainProcess";

export interface IAvatarsProps {
  avatars: ChatWidgetHeaderAvatarConfig[];
  maxShownAvatars?: number;
}

export default function Avatars(props: IAvatarsProps) {
  const maxShownAvatars = props.maxShownAvatars || 2;
  const totalAvatars = props.avatars.length;

  if (!props.avatars || !props.avatars.length) {
    return null;
  }

  return (
    <Tooltip.Group>
      <Avatar.Group spacing="sm">
        {props.avatars.slice(0, maxShownAvatars).map((avatar, index) => {
          if (avatar.name && avatar.url) {
            return (
              <Tooltip
                label={avatar.name}
                withArrow
                key={`widget-header-avatar-${index}-${avatar.name}-${avatar.url}`}
              >
                <Avatar
                  src={avatar.url}
                  radius="xl"
                  alt={avatar.name || `Avatar for agent ${index + 1}`}
                />
              </Tooltip>
            );
          } else if (avatar.url) {
            return (
              <Avatar
                radius="xl"
                src={avatar.url}
                alt={`widget-header-avatar-${index}-${avatar.url}`}
                key={`widget-header-avatar-${index}-${avatar.url}`}
              />
            );
          } else if (avatar.name) {
            return (
              <Tooltip
                label={avatar.name}
                withArrow
                key={`widget-header-avatar-${index}-${avatar.name}`}
              >
                <Avatar radius="xl" name={avatar.name} color="initials" />
              </Tooltip>
            );
          } else {
            return null;
          }
        })}
        {totalAvatars > maxShownAvatars && (
          <Tooltip
            label={
              <>
                {props.avatars
                  .slice(maxShownAvatars)
                  .filter((a) => a.name)
                  .map((avatar, index) => (
                    <div
                      key={`widget-header-avatar-${index}-${avatar.url}-${avatar.name}`}
                    >
                      {avatar.name || ""}
                    </div>
                  ))}
              </>
            }
            withArrow
          >
            <Avatar radius="xl">+{totalAvatars - maxShownAvatars}</Avatar>
          </Tooltip>
        )}
      </Avatar.Group>
    </Tooltip.Group>
  );
}
