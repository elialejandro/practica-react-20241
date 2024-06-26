"use client";

import styles from '../../../page.module.css';
import { Card, CardBody, Heading, Textarea } from "@chakra-ui/react";
import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { createClient } from "../../../services/supabase";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function Post() {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const router = useRouter();

  async function save() {
    console.log('Save new post');

    const { data: { user } } = await supabase.auth.getUser();
    console.log(user);

    await supabase.from('blog').insert({
        user_id: user?.id,
        title: newTitle,
        content: newContent,
    });
  }

  return (
    <main className={styles.main}>
      <div className={styles.description} style={{ marginBottom: "1rem", display: 'flex', justifyContent: 'space-between' }}>
        <Heading>Nuevo post</Heading>
        <Button colorScheme='blue' onClick={() => router.push('/logout') }>Logout</Button>
      </div>
      <div>
        <Card>
            <CardBody>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input value={newTitle} onChange={(e) => {
                        setNewTitle(e.target.value)
                    }}></Input>
                </FormControl>
                <FormControl>
                    <FormLabel>Contenido</FormLabel>
                    <Textarea value={newContent} onChange={(e) => {
                        setNewContent(e.target.value)
                    }}></Textarea>
                </FormControl>
                <Button mt={4} colorScheme='blue' onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    save();
                }}>Guardar</Button>
            </CardBody>
        </Card>
      </div>
    </main>
  );
}
