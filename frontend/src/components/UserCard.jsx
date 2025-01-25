import { Carousel } from "@mantine/carousel";
import { Card, Button, Text, Title, Group, Paper } from "@mantine/core";
import { useState, useEffect } from "react";
import { axiosSubmissions } from "../../utils/api";

// UserCard component to display each user's info with images in a carousel
function UserCard({ name, email, socialMediaHandle, uploadedImages }) {
  return (
    <Paper shadow='md' p='xl' radius='md'>
      <div className='text-center'>
        <Title order={3}>{name}</Title>
        <Text size='sm' color='dimmed'>
          {email}
        </Text>
        <Text size='xs' color='dimmed'>
          {socialMediaHandle || "No social media handle provided"}
        </Text>

        <Carousel
          slideSize='100%'
          slideGap='xs'
          align='center'
          style={{ marginTop: "20px" }}
        >
          {uploadedImages.map((img, idx) => (
            <Carousel.Slide key={idx}>
              <img
                src={img}
                alt={`User Image ${idx + 1}`}
                className='object-cover w-full h-48 rounded-lg'
              />
            </Carousel.Slide>
          ))}
        </Carousel>

        <Button variant='white' color='dark' style={{ marginTop: "20px" }}>
          View Profile
        </Button>
      </div>
    </Paper>
  );
}

// UserCardCarousel to render the list of user cards in a carousel
export function UserCardCarousel({ userData }) {
  return (
    <Carousel slideSize='100%' slideGap='xs' align='center'>
      {userData.map((user, index) => (
        <Carousel.Slide key={index}>
          <UserCard
            name={user.name}
            email={user.email}
            socialMediaHandle={user.socialMediaHandle}
            uploadedImages={user.uploadedImages}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
