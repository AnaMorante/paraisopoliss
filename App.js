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
  Platform,
} from "react-native";

import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

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
  const [selectedImage, setSelectedImage] = useState(null);

  const [fontsLoaded] = useFonts({
    KonkhmerSleokchher_400Regular,
  });

  const galleryImages = [
    require("./assets/foto5.jpg"),
    require("./assets/foto11.jpg"),
    require("./assets/foto7.jpg"),
    require("./assets/foto8.jpg"),
    require("./assets/foto9.jpg"),
  ];

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

      {/* MENU */}

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

          {[
            ["documentário", documentaryRef],
            ["entrevistas", interviewsRef],
            ["transcrições", transcriptionRef],
            ["fotografias", galleryRef],
            ["trabalho escrito", workRef],
          ].map(([title, ref], index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);

                setTimeout(() => {
                  scrollToSection(ref);
                }, 200);
              }}
            >
              <Text style={styles.menuText}>
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* MODAL IMAGEM */}

      <Modal
        visible={selectedImage !== null}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.imageModal}>
          <TouchableOpacity
            style={styles.closeImageButton}
            onPress={() => setSelectedImage(null)}
          >
            <Ionicons
              name="close"
              size={40}
              color="#fff"
            />
          </TouchableOpacity>

          <Image
            source={selectedImage}
            style={styles.fullscreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>

      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={styles.safePadding}
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
              “As pessoas te rejeitam porque não conhecem realmente a cultura que acontece aqui.”
            </Text>

            <Text style={styles.fakeCardSubtitle}>
              entrevistada • Ângela
            </Text>
          </View>


          <View style={[styles.fakeCard, { marginTop: 20 }]}>
            <Text style={styles.fakeCardTitle}>
              “Paraisópolis é uma favela que pulsa arte, cultura e representatividade.”
            </Text>

            <Text style={styles.fakeCardSubtitle}>
              entrevistada • Crioleza
            </Text>
          </View>
        </View>

        {/* VIDEO YOUTUBE */}

<View style={styles.youtubeSection}>
  
  <Text style={styles.sectionDescription}>
    Assista às entrevistas completas.
  </Text>

  <View style={styles.youtubeContainer}>
    {Platform.OS === "web" ? (
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/nHUxM6p0WCE"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          border: "none",
        }}
      />
    ) : (
      <WebView
        source={{
          uri: "https://www.youtube.com/embed/nHUxM6p0WCE",
        }}
        style={{ flex: 1 }}
      />
    )}
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

          <View style={styles.quoteBlock}>
            <Text style={styles.quoteSpeaker}>
              entrevistador
            </Text>

            <Text style={styles.quote}>
              “Você se sente igual a quem mora
              nos condomínios ao redor?”
            </Text>
          </View>

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
                uri: "https://www.dicasdeviagem.com/wp-content/uploads/2025/07/tour-favela-paraisopolis-scaled.jpg",
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

          <TouchableOpacity
            onPress={() =>
              setSelectedImage(require("./assets/foto1.jpeg"))
            }
          >
            <Image
              source={require("./assets/foto1.jpeg")}
              style={styles.heroGalleryImage}
            />
          </TouchableOpacity>

          <Text style={styles.galleryText}>
            Entre vielas, concreto, arte e resistência,
            Paraisópolis constrói diariamente sua própria identidade visual.
          </Text>

          <View style={styles.masonryRow}>
            <TouchableOpacity
              style={styles.tallImage}
              onPress={() =>
                setSelectedImage(require("./assets/foto2.jpeg"))
              }
            >
              <Image
                source={require("./assets/foto2.jpeg")}
                style={styles.fullSize}
              />
            </TouchableOpacity>

            <View style={styles.smallColumn}>
              <TouchableOpacity
                style={styles.smallImage}
                onPress={() =>
                  setSelectedImage(require("./assets/foto3.jpeg"))
                }
              >
                <Image
                  source={require("./assets/foto3.jpeg")}
                  style={styles.fullSize}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.smallImage}
                onPress={() =>
                  setSelectedImage(require("./assets/foto4.jpeg"))
                }
              >
                <Image
                  source={require("./assets/foto4.jpeg")}
                  style={styles.fullSize}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* CARROSSEL */}

          <ScrollView
            horizontal
            pagingEnabled
            decelerationRate="fast"
            snapToAlignment="center"
            snapToInterval={width * 0.72 + 16}
            disableIntervalMomentum={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
          >
            {galleryImages.map((img, index) => (
              <View
                key={index}
                style={styles.carouselCard}
              >
                <TouchableOpacity
                  onPress={() => setSelectedImage(img)}
                >
                  <Image
                    source={img}
                    style={styles.carouselImage}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.bottomGrid}>
            <TouchableOpacity
              onPress={() =>
                setSelectedImage(require("./assets/foto6.jpg"))
              }
            >
              <Image
                source={require("./assets/foto6.jpg")}
                style={styles.bottomImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setSelectedImage(require("./assets/foto13.jpeg"))
              }
            >
              <Image
                source={require("./assets/foto13.jpeg")}
                style={styles.bottomImage}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() =>
              setSelectedImage(require("./assets/foto10.jpg"))
            }
          >
            <Image
              source={require("./assets/foto10.jpg")}
              style={styles.finalImage}
            />
          </TouchableOpacity>
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

          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() =>
              Linking.openURL(
                "https://drive.google.com/file/d/1jr4OaTJmuMbuLqD8Tsy8vN3EBM8Ei-Lj/view?usp=sharing"
              )
            }
          >
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

  safePadding: {
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },

  fixedMenuButton: {
    position: "absolute",
    top: height * 0.06,
    right: width * 0.05,
    zIndex: 999,
    backgroundColor: "#fff",
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

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
    fontSize: width * 0.08,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  hero: {
    width: "100%",
    height: height,
    justifyContent: "space-between",
    paddingTop: height * 0.04,
    paddingBottom: height * 0.05,
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
    width: width * 0.95,
    height: height * 0.22,
    zIndex: 2,
  },

  heroBottom: {
    zIndex: 2,
  },

  sectionConcrete: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 80,
    minHeight: height * 0.9,
    justifyContent: "space-between",
  },

  sectionConcreteImage: {
    resizeMode: "cover",
  },

  title: {
    color: "#fff",
    fontSize: width * 0.11,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  paragraph: {
    color: "#fff",
    fontSize: width * 0.05,
    lineHeight: width * 0.075,
    width: "92%",
  },

  sideText: {
    color: "#fff",
    fontSize: width * 0.07,
    fontFamily: "KonkhmerSleokchher_400Regular",
    lineHeight: width * 0.095,
  },

  videoContainer: {
    width: "100%",
    height: height * 0.75,
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
    fontSize: width * 0.08,
    lineHeight: width * 0.1,
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
    fontSize: width * 0.09,
    marginBottom: 20,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  sectionDescription: {
    color: "#ddd",
    fontSize: width * 0.045,
    lineHeight: width * 0.07,
    marginBottom: 40,
  },

  fakeCard: {
    borderWidth: 1,
    borderColor: "#444",
    padding: 24,
  },

  fakeCardTitle: {
    color: "#fff",
    fontSize: width * 0.065,
    lineHeight: width * 0.09,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  fakeCardSubtitle: {
    color: "#888",
    marginTop: 20,
    fontSize: 14,
  },

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
    fontSize: width * 0.075,
    lineHeight: width * 0.11,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  cardSection: {
    backgroundColor: "#000",
    padding: 16,
    paddingVertical: 40,
  },

  cardImage: {
    width: "100%",
    height: height * 0.32,
  },

  cardText: {
    color: "#fff",
    fontSize: width * 0.065,
    fontFamily: "KonkhmerSleokchher_400Regular",
    lineHeight: width * 0.09,
    marginTop: 30,
  },

  imageModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },

  fullscreenImage: {
    width: "100%",
    height: "80%",
  },

  closeImageButton: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 999,
  },

  gallerySection: {
    backgroundColor: "#000",
    paddingTop: 80,
    paddingBottom: 80,
    paddingHorizontal: 24,
  },

  heroGalleryImage: {
    width: "100%",
    height: height * 0.55,
    borderRadius: 12,
    marginTop: 20,
  },

  galleryText: {
    color: "#fff",
    fontSize: width * 0.055,
    lineHeight: width * 0.085,
    marginTop: 30,
    marginBottom: 40,
  },

  masonryRow: {
    flexDirection: "row",
    gap: width * 0.025,
    marginBottom: 50,
  },

  tallImage: {
    width: "58%",
    height: height * 0.42,
    borderRadius: 12,
    overflow: "hidden",
  },

  smallColumn: {
    width: "39%",
    justifyContent: "space-between",
  },

  smallImage: {
    width: "100%",
    height: height * 0.2,
    borderRadius: 12,
    overflow: "hidden",
  },

  fullSize: {
    width: "100%",
    height: "100%",
  },

  carousel: {
    paddingRight: 24,
    marginBottom: 50,
  },

  carouselCard: {
    marginRight: 16,
  },

  carouselImage: {
    width: width * 0.72,
    height: height * 0.5,
    borderRadius: 18,
  },

  bottomGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  bottomImage: {
    width: width * 0.42,
    height: height * 0.22,
    borderRadius: 12,
  },

  finalImage: {
    width: "100%",
    height: height * 0.38,
    borderRadius: 12,
    marginTop: 10,
  },

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
    fontSize: width * 0.055,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  footer: {
    padding: 40,
    backgroundColor: "#000",
    alignItems: "center",
  },

  footerText: {
    color: "#fff",
    textAlign: "center",
    fontSize: width * 0.06,
    lineHeight: width * 0.09,
    fontFamily: "KonkhmerSleokchher_400Regular",
  },

  /* YOUTUBE */

youtubeSection: {
  backgroundColor: "#111",
  padding: 24,
  paddingTop: 70,
  paddingBottom: 90,
},

youtubeContainer: {
  width: "100%",
  height: 220,
  borderRadius: 20,
  overflow: "hidden",
  marginTop: 20,
},

});