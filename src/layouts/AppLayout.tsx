import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  Image,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect } from "react";
import { Menu } from "@/components/Menu/Menu";
import { useRouter } from "next/router";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  useEffect(() => {
    if (mobileOpened) {
      toggleMobile();
    }
  }, [router.pathname]);

  const excludeStartPathname = [
    "/login",
    "/pdf/quotation/[id]",
    "/pdf/boq/[id]",
    "/pdf/summary/[id]",
    "/pdf/document/contract/[id]",
    "/pdf/document/invoice/[id]",
    "/pdf",
    "/auth/sign-in"
  ];

  if (excludeStartPathname.includes(router.pathname)) {
    return <>{children}</>;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header className="flex items-center gap-2 px-3">
        <Group h="100%" px="md" w="100%">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Link href={"/"}>
            <div className="text-xl font-bold">BuildWise Devops</div>
          </Link>
        </Group>
        {/* {colorScheme === "dark" ? (
          <ActionIcon variant="subtle" onClick={() => setColorScheme("light")}>
            <IconSun size={18} />
          </ActionIcon>
        ) : (
          <ActionIcon variant="subtle" onClick={() => setColorScheme("dark")}>
            <IconMoon size={18} />
          </ActionIcon>
        )} */}
      </AppShell.Header>
      <AppShell.Navbar>
        <Menu />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
