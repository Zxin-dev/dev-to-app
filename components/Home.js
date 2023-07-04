import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { SafeAreaView, Button } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "expo-image";
import moment from "moment";

export default function Home({ navigation }) {
  const [article, setArticle] = useState([]);
  useEffect(() => {
    fetch("https://dev.to/api/articles?username=whitep4nth3r")
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
      });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.main}>
          {article.map((article) => {
            return (
              <View style={styles.container}>
                <View style={styles.header}>
                  <Image
                    style={styles.profileImage}
                    source={article.user.profile_image}
                    contentFit="cover"
                    transition={1000}
                  ></Image>
                  <View style={{ display: "flex" }}>
                    <Text style={styles.name}> {article.user.name}</Text>
                    <Text style={{ fontSize: 10, color: "gray" }}>
                      {" "}
                      {moment(article.created_at).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    </Text>
                  </View>
                </View>
                <View style={styles.body}>
                  <Text style={styles.title}>{article.title}</Text>
                </View>
                <Image
                  style={styles.image}
                  source={article.social_image}
                  contentFit="cover"
                  transition={1000}
                ></Image>
                <Button
                  onPress={() =>
                    navigation.navigate(`Blog`, { slug: article.slug })
                  }
                  title="Learn More"
                  color="black"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#00CCFF",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 70,
  },
  container: {
    width: 340,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: "10",
  },
  name: {
    fontWeight: "bold",
  },
  body: {},
  title: {
    fontWeight: "600",
  },
  image: {
    width: 320,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
  },
});
