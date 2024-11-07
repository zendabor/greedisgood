import { Header } from "@/components/header/header";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="root">
        <Header />
        <main>
          <Container>
            {children}
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}
