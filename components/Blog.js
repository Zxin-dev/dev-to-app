import { Text } from "react-native";
import * as React from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { useState, useEffect } from "react";
import RenderHtml from "react-native-render-html";
import { SafeAreaView, ScrollView } from "react-native";
export default function Blog({ route }) {
  const { slug } = route.params;

  const [article, setArticle] = useState([]);
  useEffect(() => {
    fetch(`https://dev.to/api/articles/whitep4nth3r/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
        console.log(article);
      });
  }, []);

  if (!article)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  return (
    <SafeAreaView>
      <ScrollView>
        <RenderHtml source={{ html: article.body_html }} />
      </ScrollView>
    </SafeAreaView>
  );
}
