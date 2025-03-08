import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface EmailTemplateProps {
  message: string;
  authorName?: string;
  authorImage?: string;
  reviewText?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

const EmailTemplate = ({
  message,
  authorName,
  authorImage = 'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
  reviewText,
}: EmailTemplateProps) => {
  const previewText = `Read ${authorName}'s review`;
  return (
    <Html>
      <Head />

      <Body style={main}>
        <Preview>{previewText}</Preview>
        <Container style={container}>
          <Section>
            <Img
              src='https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg'
              width='96'
              height='30'
              alt='Techreptile'
            />
          </Section>
          <Section>
            <Img
              src={authorImage}
              width='96'
              height='96'
              alt={authorName}
              style={userImage}
            />
          </Section>
          <Section style={{ paddingBottom: '20px' }}>
            <Row>
              <Text style={heading}>Here&apos;s what {authorName} wrote</Text>
              <Text style={review}>{reviewText}</Text>
              <Text style={paragraph}>
                Now that the review period is over, we’ve posted {authorName}
                ’s review to your Airbnb profile.
              </Text>
              <Text style={paragraph}>{message}</Text>
              <Text style={{ ...paragraph, paddingBottom: '16px' }}>
                While it’s too late to write a review of your own, you can send
                your feedback to {authorName} using your Airbnb message thread.
              </Text>

              <Button style={button} href='https://airbnb.com/'>
                Send My Feedback
              </Button>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section>
            <Row>
              <Text style={{ ...paragraph, fontWeight: '700' }}>
                Common questions
              </Text>
              <Text>
                <Link href='https://airbnb.com/help/article/13' style={link}>
                  How do reviews work?
                </Link>
              </Text>
              <Text>
                <Link href='https://airbnb.com/help/article/1257' style={link}>
                  How do star ratings work?
                </Link>
              </Text>
              <Text>
                <Link href='https://airbnb.com/help/article/995' style={link}>
                  Can I leave a review after 14 days?
                </Link>
              </Text>
              <Hr style={hr} />
              <Text style={footer}>
                Airbnb, Inc., 888 Brannan St, San Francisco, CA 94103
              </Text>
              <Link href='https://airbnb.com' style={reportLink}>
                Report unsafe behavior
              </Link>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

EmailTemplate.PreviewProps = {
  authorName: 'Asif',
  authorImage: '/logo.png',
  reviewText: `“Alan was a great guest! Easy communication, the apartment was left
    in great condition, very polite, and respectful of all house rules.
    He’s welcome back anytime and would easily recommend him to any
    host!”`,
} as EmailTemplateProps;

export default EmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
  maxWidth: '100%',
};

const userImage = {
  margin: '0 auto',
  marginBottom: '16px',
  borderRadius: '50%',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
};

const review = {
  ...paragraph,
  padding: '24px',
  backgroundColor: '#f2f3f3',
  borderRadius: '4px',
};

const button = {
  backgroundColor: '#ff5a5f',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '18px',
  padding: '19px 30px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};

const link = {
  ...paragraph,
  color: '#ff5a5f',
  display: 'block',
};

const reportLink = {
  fontSize: '14px',
  color: '#9ca299',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  marginBottom: '10px',
};
