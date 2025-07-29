import { Avatar, Tooltip } from "@mantine/core";

import { useConfig } from "../../../../../providers/ConfigProvider";

export default function ChatWindowHeaderAvatar() {
  const { config } = useConfig();

  const maxShownAvatars = config.chatWindow?.header?.maxShownAvatars || 2;

  if (!config.chatWindow?.header?.avatars?.length) {
    return null;
  }

  const totalAvatars = config.chatWindow.header.avatars.length;

  return (
    <Tooltip.Group>
      <Avatar.Group spacing="sm">
        {config.chatWindow.header.avatars
          .slice(0, maxShownAvatars)
          .map((avatar, index) => {
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
                {config.chatWindow.header.avatars
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
