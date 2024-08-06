// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import { FormattedMessage } from "react-intl";
import PT from "prop-types";
import { ContentType } from "../../datamodel/Model";

export class SystemMessage extends React.PureComponent {
  static propTypes = {
    messageDetails: PT.object.isRequired,
  };

  static defaultProps = {};

  getMessageText = () => {
    console.log("SystemMessage getMessageText");
    console.log(this.props);
    let lang = window.lang || "en";
    let chatWContent = {
      en: {
        PARTICIPANT_JOINED: " has joined the chat",
        PARTICIPANT_LEFT: " has left the chat",
        CHAT_ENDED: "Chat has ended!",
        PARTICIPANT_IDLE: " has become idle",
        PARTICIPANT_DISCONNECT: " has been idle too long, disconnecting",
        PARTICIPANT_RETURNED: " has returned",
      },
      es: {
        PARTICIPANT_JOINED: " se ha unido al chat",
        PARTICIPANT_LEFT: " ha abandonado el chat",
        CHAT_ENDED: "Chat has ended!",
        PARTICIPANT_IDLE: " se ha vuelto inactivo",
        PARTICIPANT_DISCONNECT:
          " ha estado inactivo demasiado tiempo, desconectándose",
        PARTICIPANT_RETURNED: " ha regresado",
      },
      ja: {
        PARTICIPANT_JOINED: "チャットに参加しました",
        PARTICIPANT_LEFT: " チャットから退出しました",
        CHAT_ENDED: "チャットが終了しました！",
        PARTICIPANT_IDLE: "アイドルになった",
        PARTICIPANT_DISCONNECT: "アイドル状態が長すぎるため、切断されました",
        PARTICIPANT_RETURNED: " 帰りました",
      },
      pt_br: {
        PARTICIPANT_JOINED: " Se juntou ao chat",
        PARTICIPANT_LEFT: " Deixou o bate-papo",
        CHAT_ENDED: "O bate-papo terminou!",
        PARTICIPANT_IDLE: " ficou ocioso",
        PARTICIPANT_DISCONNECT: " ficou inativo por muito tempo, desconectando",
        PARTICIPANT_RETURNED: "Voltou",
      },
      pt: {
        PARTICIPANT_JOINED: " Se juntou ao chat",
        PARTICIPANT_LEFT: " Deixou o bate-papo",
        CHAT_ENDED: "O bate-papo terminou!",
        PARTICIPANT_IDLE: " ficou ocioso",
        PARTICIPANT_DISCONNECT: " ficou inativo por muito tempo, desconectando",
        PARTICIPANT_RETURNED: "Voltou",
      },
      fr: {
        PARTICIPANT_JOINED: " a rejoint la discussion",
        PARTICIPANT_LEFT: " à quitté la discussion",
        CHAT_ENDED: "Le chat est terminé !",
        PARTICIPANT_IDLE: "est devenu inactif",
        PARTICIPANT_DISCONNECT:
          " est resté inactif trop longtemps et s'est déconnecté",
        PARTICIPANT_RETURNED: " est revenu",
      },
      zh: {
        PARTICIPANT_JOINED: " 已加入聊天",
        PARTICIPANT_LEFT: " 已经离开聊天",
        CHAT_ENDED: "聊天已结束！",
        PARTICIPANT_IDLE: "已闲置",
        PARTICIPANT_DISCONNECT: "闲置时间过长，断开连接",
        PARTICIPANT_RETURNED: "已返回",
      },
      th: {
        PARTICIPANT_JOINED: " ได้เข้าร่วมการแชทแล้ว",
        PARTICIPANT_LEFT: "ออกจากแชทแล้ว",
        CHAT_ENDED: "แชทจบแล้ว!",
        PARTICIPANT_IDLE: " กลายเป็นไม่ได้ใช้งาน",
        PARTICIPANT_DISCONNECT: " ไม่ได้ใช้งานนานเกินไป กำลังตัดการเชื่อมต่อ",
        PARTICIPANT_RETURNED: " กลับมาแล้ว",
      },
    };

    let name = this.props.messageDetails.displayName;
    switch (this.props.messageDetails.content.type) {
      case ContentType.EVENT_CONTENT_TYPE.PARTICIPANT_JOINED:
        name = this.props.messageDetails.displayName;
        return (
          name + chatWContent[lang]["PARTICIPANT_JOINED"] ||
          " has joined the chat"
        );
      case ContentType.EVENT_CONTENT_TYPE.PARTICIPANT_LEFT:
        name = this.props.messageDetails.displayName;
        return (
          name + chatWContent[lang]["PARTICIPANT_LEFT"] || " has left the chat"
        );
      case ContentType.EVENT_CONTENT_TYPE.CHAT_ENDED:
        return chatWContent[lang]["CHAT_ENDED"] || "Chat has ended!";
      case ContentType.EVENT_CONTENT_TYPE.PARTICIPANT_IDLE:
        return (
          name + chatWContent[lang]["PARTICIPANT_IDLE"] || " has become idle"
        );
      case ContentType.EVENT_CONTENT_TYPE.PARTICIPANT_DISCONNECT:
        return (
          name + chatWContent[lang]["PARTICIPANT_DISCONNECT"] ||
          " has been idle too long, disconnecting"
        );
      case ContentType.EVENT_CONTENT_TYPE.PARTICIPANT_RETURNED:
        return (
          name + chatWContent[lang]["PARTICIPANT_RETURNED"] || " has returned"
        );
      default:
        return "";
    }
  };
  render() {
    return <>{this.getMessageText()}</>;
  }
}
