import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";

import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import {
  useFonts,
  KonkhmerSleokchher_400Regular,
} from "@expo-google-fonts/konkhmer-sleokchher";

const { width, height } = Dimensions.get("window");

export default function App() {
  const video = useRef(null);

  const scrollRef = useRef();

  const documentaryRef = useRef(null);
  const interviewsRef = useRef(null);
  const transcriptionRef = useRef(null);
  const galleryRef = useRef(null);
  const workRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    KonkhmerSleokchher_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const scrollToSection = (ref) => {
    ref.current?.measureLayout(
      scrollRef.current,
      (x, y) => {
        scrollRef.current.scrollTo({
          y,
          animated: true,
        });
      }
    );
  };

  const toggleVideo = async () => {
    if (!video.current) return;

    if (playing) {
      await video.current.pauseAsync();
    } else {
      await video.current.playAsync();
    }

    setPlaying(!playing);
  };

  return (
    <>
      <StatusBar style="light" />

      {/* MENU FIXO */}

      <TouchableOpacity
        style={styles.fixedMenuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Ionicons
          name="menu"
          size={38}
          color="#000"
        />
      </TouchableOpacity>

      {/* MENU MODAL */}

      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.menuOverlay}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setMenuVisible(false)}
          >
            <Ionicons
              name="close"
              size={38}
              color="#fff"
            />
          </TouchableOpacity>

          {/* DOCUMENTÁRIO */}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);

              setTimeout(() => {
                scrollToSection(documentaryRef);
              }, 200);
            }}
          >
            <Text style={styles.menuText}>
              documentário
            </Text>
          </TouchableOpacity>

          {/* ENTREVISTAS */}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);

              setTimeout(() => {
                scrollToSection(interviewsRef);
              }, 200);
            }}
          >
            <Text style={styles.menuText}>
              entrevistas
            </Text>
          </TouchableOpacity>

          {/* TRANSCRIÇÕES */}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);

              setTimeout(() => {
                scrollToSection(transcriptionRef);
              }, 200);
            }}
          >
            <Text style={styles.menuText}>
              transcrições
            </Text>
          </TouchableOpacity>

          {/* FOTOGRAFIAS */}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);

              setTimeout(() => {
                scrollToSection(galleryRef);
              }, 200);
            }}
          >
            <Text style={styles.menuText}>
              fotografias
            </Text>
          </TouchableOpacity>

          {/* TRABALHO */}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);

              setTimeout(() => {
                scrollToSection(workRef);
              }, 200);
            }}
          >
            <Text style={styles.menuText}>
              trabalho escrito
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView
        ref={scrollRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}

        <ImageBackground
          source={require("./assets/paraisopolis.png")}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.overlay} />

          <Image
            source={require("./assets/titulo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.heroBottom}>
            <Ionicons
              name="chevron-down"
              size={32}
              color="#fff"
            />
          </View>
        </ImageBackground>

        {/* INTRO */}

        <ImageBackground
          source={require("./assets/grafite.png")}
          style={styles.sectionConcrete}
          imageStyle={styles.sectionConcreteImage}
        >
          <View style={styles.sectionOverlay} />

          <Text style={styles.title}>
            Paraisópolis
          </Text>

          <Text style={styles.paragraph}>
            Muito além da estética vendável,
            Paraisópolis é um território construído
            por resistência, criatividade e
            sobrevivência coletiva.
          </Text>

          <Text style={styles.sideText}>
            Entre o apagamento e a apropriação cultural,
            existe uma favela que continua pulsando vida.
          </Text>
        </ImageBackground>

        {/* VIDEO */}

        <View
          ref={documentaryRef}
          style={styles.videoContainer}
        >
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: "https://cdn.coverr.co/videos/coverr-aerial-view-of-city-1560084122262?download=1080p",
            }}
            useNativeControls={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted
          />

          <View style={styles.videoOverlay}>
            <Text style={styles.videoText}>
              enquanto a mídia estetiza,
              a comunidade resiste.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.playButton}
            onPress={toggleVideo}
          >
            <Ionicons
              name={playing ? "pause" : "play"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* ENTREVISTAS */}

        <View
          ref={interviewsRef}
          style={styles.contentSection}
        >
          <Text style={styles.sectionTitle}>
            entrevistas
          </Text>

          <Text style={styles.sectionDescription}>
            Relatos de moradores e pessoas que vivenciam
            Paraisópolis diariamente.
          </Text>

          <View style={styles.fakeCard}>
            <Text style={styles.fakeCardTitle}>
              “Eu acho o Paraisópolis o máximo, o melhor lugar de morar que eu já conheci.”
            </Text>

            <Text style={styles.fakeCardSubtitle}>
              entrevista • morador local
            </Text>
          </View>

          <View style={[styles.fakeCard, { marginTop: 20 }]}>
            <Text style={styles.fakeCardTitle}>
              “o problema não é só a estética,
              é quem lucra com ela.”
            </Text>

            <Text style={styles.fakeCardSubtitle}>
              entrevista • pesquisador
            </Text>
          </View>
        </View>

        {/* TRANSCRIÇÕES */}

        <View
          ref={transcriptionRef}
          style={styles.contentSectionDark}
        >
          <Text style={styles.sectionTitle}>
            transcrições
          </Text>

          <Text style={styles.sectionDescription}>
            Fragmentos, memórias e narrativas coletadas
            ao longo da pesquisa.
          </Text>

          {/* BLOCO 1 */}

          <View style={styles.quoteBlock}>
            <Text style={styles.quoteSpeaker}>
              entrevistador
            </Text>

            <Text style={styles.quote}>
              “Você se sente igual a quem mora
              nos condomínios ao redor?”
            </Text>
          </View>

          {/* BLOCO 2 */}

          <View
            style={[
              styles.quoteBlock,
              { marginTop: 40 },
            ]}
          >
            <Text style={styles.quoteSpeaker}>
              yanca
            </Text>

            <Text style={styles.quote}>
              “Não, me sinto melhor.
              Me sinto bem melhor.”
            </Text>
          </View>
        </View>

        {/* CARD */}

        <View style={styles.cardSection}>
          <View style={styles.card}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200",
              }}
              style={styles.cardImage}
            />

            <Text style={styles.cardText}>
              Paraisópolis se transforma em produto
              sem que sua realidade seja escutada.
            </Text>
          </View>
        </View>

        {/* GALERIA */}

        <View
          ref={galleryRef}
          style={styles.gallerySection}
        >
          <Text style={styles.sectionTitle}>
            fotografias
          </Text>

          <View style={styles.grid}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200",
              }}
              style={styles.gridImage}
            />

            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200",
              }}
              style={styles.gridImage}
            />
          </View>
        </View>

        {/* TRABALHO */}

        <View
          ref={workRef}
          style={styles.workSection}
        >
          <Text style={styles.sectionTitle}>
            trabalho escrito
          </Text>

          <Text style={styles.sectionDescription}>
            Pesquisa sobre gentrificação cultural,
            pós-modernidade e estetização da carência.
          </Text>

          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>
              acessar pesquisa
            </Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            quando a favela vira estética,
            o que acontece com as pessoas
            que vivem nela?
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  /* MENU FIXO */

  fixedMenuButton: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 999,
    backgroundColor: "#fff",
    width: 58,
    height: 58,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  /* MENU */

  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.97)",
    justifyContent: "center",
    padding: 30,
  },

  closeButton: {
    position: "absolute",
    top: 60,
    right: 24,
  },

  menuItem: {
    marginBottom: 35,
  },

  menuText: {
    color: "#fff",
    fontSize: 40,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  /* HERO */

  hero: {
    width: "100%",
    height: height * 1.0,
    justifyContent: "space-between",
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  heroImage: {
    resizeMode: "cover",
    transform: [{ translateY: 50 }],
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  logo: {
    width: width * 1.1,
    height: 180,
    zIndex: 2,
  },

  heroBottom: {
    zIndex: 2,
  },

  /* INTRO */

  sectionConcrete: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 80,
    position: "relative",
    minHeight: height * 0.9,
    justifyContent: "space-between",
  },

  sectionConcreteImage: {
    resizeMode: "cover",
  },

  sectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  title: {
    color: "#fff",
    fontSize: 44,
    fontFamily: "KonkhmerSleokchher_400Regular",
    marginBottom: 5,
    zIndex: 2,
  },

  paragraph: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    width: "90%",
    zIndex: 2,
  },

  sideText: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "KonkhmerSleokchher_400Regular",
    width: "95%",
    marginTop: 20,
    lineHeight: 38,
    zIndex: 2,
  },

  /* VIDEO */

  videoContainer: {
    width: "100%",
    height: 600,
    position: "relative",
  },

  video: {
    width: "100%",
    height: "100%",
  },

  videoOverlay: {
    position: "absolute",
    bottom: 120,
    left: 24,
    width: "80%",
  },

  videoText: {
    color: "#fff",
    fontSize: 34,
    lineHeight: 42,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  playButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 54,
    height: 54,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  /* CONTENT */

  contentSection: {
    backgroundColor: "#111",
    padding: 24,
    paddingTop: 80,
    paddingBottom: 80,
  },

  contentSectionDark: {
    backgroundColor: "#000",
    padding: 24,
    paddingTop: 80,
    paddingBottom: 80,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 36,
    marginBottom: 20,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  sectionDescription: {
    color: "#ddd",
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 40,
  },

  fakeCard: {
    borderWidth: 1,
    borderColor: "#444",
    padding: 24,
  },

  fakeCardTitle: {
    color: "#fff",
    fontSize: 26,
    lineHeight: 36,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  fakeCardSubtitle: {
    color: "#888",
    marginTop: 20,
    fontSize: 14,
  },

  /* QUOTES */

  quoteBlock: {
    marginTop: 20,
  },

  quoteSpeaker: {
    color: "#888",
    fontSize: 16,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 2,
  },

  quote: {
    color: "#fff",
    fontSize: 30,
    lineHeight: 42,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  /* CARD */

  cardSection: {
    backgroundColor: "#000",
    padding: 16,
    paddingVertical: 40,
  },

  card: {
    backgroundColor: "#000",
  },

  cardImage: {
    width: "100%",
    height: 220,
  },

  cardText: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "KonkhmerSleokchher_400Regular",
    padding: 5,
    lineHeight: 38,
    marginTop: 30,
  },

  /* GALERIA */

  gallerySection: {
    backgroundColor: "#000",
    paddingTop: 80,
    paddingBottom: 80,
    paddingHorizontal: 24,
  },

  grid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  gridImage: {
    width: width / 2 - 29,
    height: 260,
  },

  /* TRABALHO */

  workSection: {
    backgroundColor: "#111",
    padding: 24,
    paddingTop: 80,
    paddingBottom: 100,
  },

  downloadButton: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 20,
    marginTop: 20,
    alignItems: "center",
  },

  downloadButtonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  /* FOOTER */

  footer: {
    padding: 40,
    backgroundColor: "#000",
    alignItems: "center",
  },

  footerText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    lineHeight: 36,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },
});