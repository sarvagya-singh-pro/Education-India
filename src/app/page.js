"use client"

import { AppShell,Burger,Group,Card,Center, Title, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Tables from '../components/ui/Table'
import Landing from '../components/landing'
export default function page() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
    <AppShell   padding={0} header={{ height: { base: 60, md: 70, lg: 80 } }}>
  <AppShell.Header>
    <Group w={"100%"} h={"100%"}>
        <Burger
        ml={"lg"}
        mr={"lg"}
          opened={opened}
          onClick={toggle}
          size="md"
        />
        <div>Logo</div>
        
        </Group>

      </AppShell.Header>

      <AppShell.Main>
        <>

        <Landing/>
        <Title order={1} ta={"center"} fw={300} p={"xl"}>College List</Title>
        <Center>
        <Card w={"80%"} m={"xl"} shadow="md" padding="lg" radius="md" withBorder>
        <Tables/>

        </Card>
        </Center>
        </>
      </AppShell.Main>
    </AppShell>
    </>
  );
}